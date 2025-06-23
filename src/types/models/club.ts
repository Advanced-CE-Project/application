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
  createdAt: string;
  updatedAt: string;
  location: ClubLocation;
  owner: ClubOwner;
  tags: ClubTag[];
  members: ClubMember[];
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
