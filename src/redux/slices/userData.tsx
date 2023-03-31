import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  email: undefined,
  uid: undefined,
  name: undefined,
  age: undefined,
  bio: undefined,
  category: undefined,
  gender: undefined,
  interests: [],
  isAdmin: undefined,
  username: undefined,
  profilePhotoUrl: undefined,
  socials: {
    instagramUsername: undefined,
    twitterUsername: undefined,
    facebookUrl: undefined,
    youtubeUrl: undefined,
    portfolioUrl: undefined,
  },
  savedProperty: [],
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
      state.socials.facebookUrl = payload?.socials.facebookProfileUrl;
      state.gender = payload?.gender;
      state.socials.instagramUsername = payload?.socials.instagramUsername;
      state.interests = payload?.interests;
      state.isAdmin = payload?.isAdmin;
      // state.isKycDone = payload?.isKycDone;
      // state.isNsfw = payload?.isNsfw;
      // state.phone = payload?.phone;
      state.socials.portfolioUrl = payload?.socials.portfolioUrl;
      // state.profileViews = payload?.profileViewsCount;
      state.socials.twitterUsername = payload?.socials.twitterUsername;
      state.username = payload?.username;
      state.socials.youtubeUrl = payload?.socials.youtubeProfileUrl;
    },
    updateUserDp: (state, { payload }) => {
      state.profilePhotoUrl = payload?.profilePhotoUrl;
    },
    // nftTokenId: (state, { payload }) => {
    //   state.nftIds = payload?.nftIds;
    // },
  },
});

export const UserDataActions = userDataSlice.actions;

export default userDataSlice.reducer;
