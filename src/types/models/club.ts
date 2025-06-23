export interface ClubItem {
  id: string;
  name: string;
  description: string;
  tags: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  location: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    placeType: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  startDateTime: string;
  endDateTime: string;
  maxParticipants: number;
  currentParticipants: number;
  isStarted: boolean;
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClubDetail {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  maxParticipants: number;
  ownerId: string;
  locationId: string;
  startDateTime: string;
  endDateTime: string;
  isStarted: boolean;
  actualStartDateTime: string | null;
  isEnded: boolean;
  actualEndDateTime: string | null;
  createdAt: string;
  updatedAt: string;
  location: ClubLocation;
  owner: ClubOwner;
  tags: ClubTag[];
  members: ClubMember[];
  files: ClubFile[];
  missions: ClubMission[];
  attendance: ClubAttendance[];
  ratings: ClubRating[];
}

export interface ClubFile {
  id: string;
  createdAt: string;
}

export interface ClubMission {
  id: string;
  title: string;
  description: string;
  deadline: string;
  verificationType: string;
  createdAt: string;
  statuses: ClubMissionStatus[];
}

export interface ClubMissionStatus {
  userId: string;
  status: string;
  verificationUrl: string | null;
}

export interface ClubAttendance {
  userId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
}

export interface ClubRating {
  id: string;
}

export interface ClubLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeType: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClubOwner {
  id: string;
  nickname: string;
  profileImage: string | null;
}

export interface ClubTag {
  id: string;
  name: string;
  createdAt: string;
}

export interface ClubMember {
  userId: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  user: {
    nickname: string;
    profileImage: string | null;
  };
}

export interface ClubApplicant {
  memberId: string;
  userId: string;
  appliedAt: string;
  user: {
    id: string;
    nickname: string;
    profileImage: string | null;
    email: string;
  };
}

export interface ClubApplicantsResponse {
  club: {
    id: string;
    name: string;
  };
  applicants: ClubApplicant[];
}
