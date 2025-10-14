import styled from 'styled-components';
import React from 'react';

const CardContainer = styled.div`
    border-radius: 16px;
    border: 1px solid #F0F0F0;
    background: #ffffff;
    box-shadow: 0 1px 8.4px 9px rgba(0, 0, 0, 0.02);
    display: flex;
    padding: 24px;
    align-items: flex-start;
    gap: 16px;

    .card-icon {
        display: flex;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
        gap: 12px;
        background-color: #E1F6FD;
        color: #3E8AC9;
        border-radius: 50%;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        @media screen and (max-width: calc(1600px - 1px)) {
            gap: 4px;
        }
        
        .label-text {
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            @media screen and (max-width: calc(1600px - 1px)) {
                font-size: 14px;
            }
            
        }
        
        .value-text {
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            
            @media screen and (max-width: calc(1600px - 1px)) {
                font-size: 24px;
            }
            
        }
        
    }

`;

type KPICardProps = {
  icon: React.ReactNode;
  labelText: string;
  valueText: string | number;
}

export const KPICard = (props: KPICardProps) => {
  const { icon, labelText, valueText } = props;

  return (
    <CardContainer>
      <div className="card-icon">
        {icon}
      </div>
      <div className="content-container">
        <div className="label-text">{labelText}</div>
        <div className="value-text">{valueText}</div>
      </div>
    </CardContainer>
  );
};