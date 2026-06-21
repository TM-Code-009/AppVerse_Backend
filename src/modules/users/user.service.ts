import User from "./user.model";
import App from "../apps/app.model";

export const findByEmail =
  async (
    email: string
  ) => {
    return User.findOne({
      email,
    });
  };

export const createUser =
  async (
    data: any
  ) => {
    return User.create(data);
  };

export const getUserById =
  async (
    id: string
  ) => {
    return User.findById(id);
  };

export const getDevelopers =
  async () => {
    return User.find({
      role: "developer",
    });
  };

export const getClients =
  async () => {
    return User.find({
      role: "client",
    });
  };


  


export const findById = async (
  id: string
) => {
  return User.findById(id)
    .populate("followers", "name")
    .populate("following", "name")
    .populate("savedApps");
};

export const updateProfile = async (
  id: string,
  data: any
) => {
  return User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const followUser = async (
  currentUserId: string,
  targetUserId: string
) => {
  if (
    currentUserId ===
    targetUserId
  ) {
    throw new Error(
      "You cannot follow yourself"
    );
  }

  const currentUser =
    await User.findById(
      currentUserId
    );

  const targetUser =
    await User.findById(
      targetUserId
    );

  if (
    !currentUser ||
    !targetUser
  ) {
    throw new Error(
      "User not found"
    );
  }

  const alreadyFollowing =
    currentUser.following.includes(
      targetUser._id
    );

  if (alreadyFollowing) {
    return currentUser;
  }

  currentUser.following.push(
    targetUser._id
  );

  targetUser.followers.push(
    currentUser._id
  );

  await currentUser.save();

  await targetUser.save();

  return currentUser;
};

export const saveApp = async (
  userId: string,
  appId: string
) => {
  const user =
    await User.findById(userId);

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const exists =
    user.savedApps.includes(
      appId as any
    );

  if (!exists) {
    user.savedApps.push(
      appId as any
    );

    await user.save();
  }

  return user;
};

export const getDeveloper =
  async (
    id: string
  ) => {
    return User.findById(id)
      .select("-password")
      .populate(
        "followers",
        "name avatar"
      )
      .populate(
        "following",
        "name avatar"
      );
  };

export const getDeveloperApps =
  async (
    id: string
  ) => {
    return App.find({
      developer: id,
    }).sort({
      createdAt: -1,
    });
  };

