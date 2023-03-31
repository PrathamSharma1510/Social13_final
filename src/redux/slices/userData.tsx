import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: undefined,
  uid: undefined,
  name: undefined,
  age: undefined,
  bio: undefined,
  category: undefined,
  dateOfJoining: undefined,
  flagCounter: undefined,
  gender: undefined,
  creatorApproval: {
    approvalStatus: undefined,
    comments: undefined,
  },
  interests: [],
  isCreator: undefined,
  isKycDone: false,
  isNsfw: false,
  phone: undefined,
  profileViews: undefined,

  username: undefined,
  verified: false,

  profilePhotoUrl: undefined,
  bankDetails: {
    accountHolderName: undefined,
    accountHolderPhoneNumber: undefined,
    accountNumber: undefined,
    accountType: undefined,
    branchName: undefined,
    ifscCode: undefined,
  },
  socials: {
    instagramUsername: undefined,
    twitterUsername: undefined,
    facebookUrl: undefined,
    youtubeUrl: undefined,
    portfolioUrl: undefined,
  },
  savedNfts: [],
  soldNfts: [],
  nftIds: [],
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.loggedIn = true;
      state.uid = payload?.uid;
      state.email = payload?.email;
    },
    logout: (state) => {
      state = initialState;
    },
    updateCurrentUserDetail: (state, { payload }) => {
      state.name = payload?.name;
      state.age = payload?.age;
      state.bio = payload?.bio;
      state.category = payload?.category;
      state.dateOfJoining = payload?.dateOfJoining;
      state.socials.facebookUrl = payload?.socials.facebookProfileUrl;
      state.flagCounter = payload?.flagCounter;
      state.gender = payload?.gender;
      state.socials.instagramUsername = payload?.socials.instagramUsername;
      state.interests = payload?.interests;
      state.isCreator = payload?.isCreator;
      state.isKycDone = payload?.isKycDone;
      state.isNsfw = payload?.isNsfw;
      state.phone = payload?.phone;
      state.socials.portfolioUrl = payload?.socials.portfolioUrl;
      state.profileViews = payload?.profileViewsCount;
      state.socials.twitterUsername = payload?.socials.twitterUsername;
      state.username = payload?.username;
      state.verified = payload?.verified;
      state.socials.youtubeUrl = payload?.socials.youtubeProfileUrl;
      state.bankDetails.accountHolderName =
        payload?.bankAccountDetails.accountHolderName;
      state.bankDetails.accountHolderPhoneNumber =
        payload?.bankAccountDetails.accountHolderPhoneNumber;
      state.bankDetails.accountNumber =
        payload?.bankAccountDetails.accountNumber;
      state.bankDetails.accountType = payload?.bankAccountDetails.accountType;
      state.bankDetails.branchName = payload?.bankAccountDetails.branchName;
      state.bankDetails.ifscCode = payload?.bankAccountDetails.ifscCode;
      state.savedNfts = payload?.savedNfts;
      state.creatorApproval.approvalStatus =
        payload?.creatorApproval.approvalStatus;
      state.creatorApproval.comments = payload?.creatorApproval.comments;
      state.soldNfts = payload?.soldNfts;
    },
    updateUserDp: (state, { payload }) => {
      state.profilePhotoUrl = payload?.profilePhotoUrl;
    },
    nftTokenId: (state, { payload }) => {
      state.nftIds = payload?.nftIds;
    },
  },
});

export const UserDataActions = userDataSlice.actions;

export default userDataSlice.reducer;
