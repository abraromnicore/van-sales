type ProfilePicture = {
  url: string;
}

type UserId = {
  _id: string;
  email: string;
  status: string;
}

export type DriverType = {
  _id: string;
  driverId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  profilePicture: ProfilePicture;
  userId: UserId;
}