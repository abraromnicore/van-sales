import React, { useMemo, useRef, useState } from 'react';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tree, TreeNode } from 'react-organizational-chart';

import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, EDIT_USER_HIERARCHY_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { Button } from '@components/button/Button.tsx';
import { Card } from '@components/card/Card.tsx';
import { CardBody } from '@components/card/CardBody.tsx';

/* ========================================
   Types & Initial Data
======================================== */
type OrgNode = {
  role: string;
  label: string;
  expanded?: boolean;
  data: string;          // unique id
  children?: OrgNode[];
};

const initialOrgChartData: OrgNode[] = [
  {
    role: 'Supervisor',
    label: 'John Doe',
    expanded: true,
    data: 'supervisor_john_doe',
    children: [
      {
        role: 'Rep',
        label: 'Jane Smith',
        expanded: true,
        data: 'rep_jane_smith',
        children: [
          { role: 'Auditor', label: 'Mark Taylor', data: 'auditor_mark_taylor' },
          { role: 'Auditor', label: 'Lisa Wong', data: 'auditor_lisa_wong' },
        ],
      },
      {
        role: 'Rep',
        label: 'David Brown',
        expanded: true,
        data: 'rep_david_brown',
        children: [{ role: 'Auditor', label: 'Emma Wilson', data: 'auditor_emma_wilson' }],
      },
    ],
  },
];

type NodeMap = Record<string, { id: string; label: string; role: string; expanded?: boolean }>;
type ChildrenMap = Record<string, string[]>;

/* ========================================
   Shape Converters (tree <-> maps)
======================================== */
function treeToMaps(
  tree: OrgNode[],
  parentId: string = 'root',
  accNodes: NodeMap = {},
  accChildren: ChildrenMap = { root: [] },
) {
  for (const node of tree) {
    const id = node.data;
    if (!id) throw new Error(`Missing "data" (id) on node: ${node.label}`);

    accNodes[id] = { id, label: node.label, role: node.role, expanded: node.expanded };

    accChildren[parentId] = accChildren[parentId] || [];
    accChildren[parentId].push(id);

    const kids = node.children ?? [];
    if (kids.length) {
      accChildren[id] = [];
      treeToMaps(kids, id, accNodes, accChildren);
    } else {
      accChildren[id] = accChildren[id] || [];
    }
  }
  return { nodes: accNodes, children: accChildren };
}

function mapsToTree(nodes: NodeMap, children: ChildrenMap, parentId: string = 'root'): OrgNode[] {
  const ids = children[parentId] || [];
  return ids.map((id) => {
    const n = nodes[id];
    const kids = mapsToTree(nodes, children, id);
    const out: OrgNode = { role: n.role, label: n.label, expanded: n.expanded, data: n.id };
    if (kids.length) out.children = kids;
    return out;
  });
}

/* ========================================
   Drag Helpers
======================================== */
function findParentId(childrenMap: ChildrenMap, childId: string) {
  for (const [pid, list] of Object.entries(childrenMap)) {
    if ((list || []).includes(childId)) return pid;
  }
  return null;
}

function isAncestor(childrenMap: ChildrenMap, ancestorId: string, possibleDescendantId: string): boolean {
  const kids = childrenMap[ancestorId] || [];
  for (const k of kids) {
    if (k === possibleDescendantId) return true;
    if (isAncestor(childrenMap, k, possibleDescendantId)) return true;
  }
  return false;
}

function moveItemImmutable(prev: ChildrenMap, itemId: string, newParentId: string, index?: number): ChildrenMap {
  if (newParentId === itemId) return prev;
  if (isAncestor(prev, itemId, newParentId)) return prev;

  const next: ChildrenMap = { ...prev };
  const fromParent = findParentId(next, itemId);
  if (!fromParent) return prev;

  const from = (next[fromParent] || []).slice();
  const at = from.indexOf(itemId);
  if (at > -1) {
    from.splice(at, 1);
    next[fromParent] = from;
  }

  const to = (next[newParentId] || []).slice();
  const toIndex = typeof index === 'number' && index >= 0 && index <= to.length ? index : to.length;
  to.splice(toIndex, 0, itemId);
  next[newParentId] = to;
  return next;
}

/* ========================================
   Left Pane: Drag UI
======================================== */
function ContainerDroppable({ parentId }: { parentId: string }) {
  const id = `container-${parentId}`;
  const { setNodeRef } = useDroppable({ id, data: { type: 'container', parentId } });
  // Invisible hit area to support "append at end"
  return <li ref={setNodeRef} style={{ height: 0, margin: 0, padding: 0 }} aria-hidden />;
}

function TreeItem({
                    id,
                    parentId,
                    title,
                    subtitle,
                    childrenMarkup,
                  }: {
  id: string;
  parentId: string;
  title: string;
  subtitle?: string;
  childrenMarkup: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id, data: { type: 'item', parentId } });

  return (
    <li
      ref={setNodeRef}
      className="my-1"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
      }}
      data-id={id}
    >
      <div
        className="flex items-center gap-2 py-2 px-2 border border-gray-200 rounded-lg bg-white" {...attributes} {...listeners}>
        <span className="cursor-grab select-none" aria-hidden>⣿</span>
        <div className="flex flex-col leading-tight">
          <div className="font-semibold">{title}</div>
          {subtitle ? <div className="text-xs text-gray-500">{subtitle}</div> : null}
        </div>
      </div>
      {childrenMarkup}
    </li>
  );
}

function PlaceholderItem() {
  return (
    <li className="my-1" aria-hidden>
      <div
        className="flex items-center gap-2 py-2 px-2 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 opacity-90">
        <span className="select-none" aria-hidden>&nbsp;</span>
        <div className="flex flex-col">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="mt-1 h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </li>
  );
}

function NestedSortableTree({
                              data,
                              onChange,
                            }: {
  data: OrgNode[];
  onChange: (nextTree: OrgNode[]) => void;
}) {
  // Build internal maps from the incoming tree
  const boot = useMemo(() => treeToMaps(data), [data]);
  const [nodes] = useState<NodeMap>(boot.nodes);
  const [children, setChildren] = useState<ChildrenMap>(boot.children);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<{ parentId: string; index: number } | null>(null);
  const lastOverRef = useRef<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const parentOf = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [pid, list] of Object.entries(children)) {
      (list || []).forEach((cid) => (map[cid] = pid));
    }
    return map;
  }, [children]);

  function computeTargetForOver(over: any) {
    const overData = over?.data?.current || {};
    if (overData.type === 'item') {
      const overParentId = overData.parentId;
      const overIndex = (children[overParentId] || []).indexOf(over.id);
      return { parentId: overParentId, index: Math.max(0, overIndex) };
    }
    if (overData.type === 'container') {
      const parentId = overData.parentId;
      return { parentId, index: (children[parentId] || []).length };
    }
    return null;
  }

  function renderContainer(parentId: string) {
    const ids = (children[parentId] || []).slice();

    // Insert a single visual placeholder into the correct container/index
    if (placeholder && placeholder.parentId === parentId) {
      const clamped = Math.min(Math.max(placeholder.index, 0), ids.length);
      ids.splice(clamped, 0, '__PLACEHOLDER__');
    }

    return (
      <SortableContext items={ids.filter((x) => x !== '__PLACEHOLDER__')} strategy={verticalListSortingStrategy}>
        <ul className="list-none pl-4 m-0" data-parent={parentId}>
          {ids.map((id) =>
            id === '__PLACEHOLDER__' ? (
              <PlaceholderItem key="__ph__" />
            ) : (
              <TreeItem
                key={id}
                id={id}
                parentId={parentId}
                title={nodes[id]?.label ?? id}
                subtitle={nodes[id]?.role}
                childrenMarkup={renderContainer(id)}
              />
            ),
          )}
          <ContainerDroppable parentId={parentId} />
        </ul>
      </SortableContext>
    );
  }

  function handleDragStart({ active }: any) {
    setActiveId(active.id);
  }

  function handleDragOver({ active, over }: any) {
    if (!over && lastOverRef.current) {
      over = lastOverRef.current;
    } else if (over) {
      lastOverRef.current = over;
    }
    if (!over) return;

    const target = computeTargetForOver(over);
    if (!target) return;

    // Bias the placeholder to avoid ping-pong flicker within the same parent
    const activeParent = parentOf[active.id];
    if (activeParent && target.parentId === activeParent) {
      const currentIndex = (children[activeParent] || []).indexOf(active.id);
      if (currentIndex > -1 && currentIndex < target.index) {
        setPlaceholder({ parentId: target.parentId, index: target.index + 1 });
        return;
      }
    }

    if (placeholder && placeholder.parentId === target.parentId && placeholder.index === target.index) {
      return; // no state change
    }
    setPlaceholder(target);
  }

  function handleDragEnd({ active, over }: any) {
    const dropOver = over || lastOverRef.current;
    const dropTarget = dropOver ? computeTargetForOver(dropOver) : null;

    setActiveId(null);
    setPlaceholder(null);
    lastOverRef.current = null;

    if (!dropTarget) return;

    const fromParent = parentOf[active.id];
    const toParent = dropTarget.parentId;
    let toIndex = dropTarget.index;

    let nextChildren: ChildrenMap;

    if (fromParent === toParent) {
      const curIndex = (children[fromParent] || []).indexOf(active.id);
      if (curIndex > -1 && curIndex < toIndex) toIndex -= 1;
      if (curIndex === toIndex) return;
      nextChildren = { ...children, [fromParent]: arrayMove(children[fromParent], curIndex, toIndex) };
    } else {
      nextChildren = moveItemImmutable(children, active.id, toParent, toIndex);
    }

    setChildren(nextChildren);

    // Build updated JSON in your original shape and push up
    const nextOrgChartData = mapsToTree(nodes, nextChildren, 'root');
    onChange(nextOrgChartData);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {renderContainer('root')}

      <DragOverlay wrapperElement="ul">
        {activeId ? (
          <li className="my-1">
            <div className="flex items-center gap-2 py-2 px-2 border border-gray-200 rounded-lg bg-white shadow-lg">
              <span className="select-none" aria-hidden>⣿</span>
              <div className="flex flex-col leading-tight">
                <div className="font-semibold">{nodes[activeId]?.label ?? activeId}</div>
                <div className="text-xs text-gray-500">{nodes[activeId]?.role}</div>
              </div>
            </div>
          </li>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

/* ========================================
   Right Pane: Org Chart preview
======================================== */
function UserCard({ label, role }: { label: string; role: string }) {
  return (
    <div className="inline-block min-w-[160px]">
      <div
        className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt={label}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{label}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
        </div>
      </div>
    </div>
  );
}

function renderTreeNodes(node: OrgNode): React.ReactNode {
  const { role, label, children, data } = node;
  if (!children || children.length === 0) {
    return <TreeNode key={data} label={<UserCard label={label} role={role} />} />;
  }
  return (
    <TreeNode key={data} label={<UserCard label={label} role={role} />}>
      {children.map((child) => renderTreeNodes(child))}
    </TreeNode>
  );
}

function OrgChartView({ data }: { data: OrgNode[] }) {
  if (!data || data.length === 0) return null;
  const root = data[0];
  return (
    <div className="w-full overflow-auto">
      <Tree lineWidth="2px" lineColor="green" lineBorderRadius="10px"
            label={<UserCard label={root.label} role={root.role} />}>
        {root.children?.map((child) => renderTreeNodes(child))}
      </Tree>
    </div>
  );
}

/* ========================================
   Page Frame
======================================== */
const HeaderActions = () => (
  <Button
    btnType="link"
    to={EDIT_USER_HIERARCHY_ROUTE.replace('{id}', '123')}
    label="Save Chages"
    variant="primary"
  />
);

export const EditUserHierarchyPage = () => {
  useMetadata({
    pageTitle: 'Edit User Hierarchy',
    breadcrumbs: [
      { label: 'Dashboard', route: DASHBOARD_ROUTE },
      { label: 'User Management', route: '' },
      { label: 'Users', route: USERS_ROUTE },
      { label: 'Hierarchy', route: '' },
      { label: 'Edit', route: '', active: true },
    ],
  });

  // Live chart state (starts from your initial data)
  const [chart, setChart] = useState<OrgNode[]>(initialOrgChartData);

  return (
    <PageLayout headerActions={<HeaderActions />}>
      <Card>
        <CardBody>
          <div className="flex">
            {/* Left */}
            <div className="flex-1 min-w-[320px] pr-3 border-r border-gray-200">
              <h3 className="mb-2 font-semibold">Drag &amp; Drop (Editable)</h3>
              <NestedSortableTree data={chart} onChange={setChart} />
            </div>

            {/* Right */}
            <div className="flex-1 min-w-[320px] pl-3">
              <h3 className="mb-2 font-semibold">Org Chart (Live Preview)</h3>
              <OrgChartView data={chart} />
            </div>
          </div>
        </CardBody>
      </Card>
    </PageLayout>
  );
};