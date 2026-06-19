import Request from "./request.model";

export const createRequest =
  async (data: any) => {
    return await Request.create(
      data
    );
  };

export const getRequests =
  async () => {
    return await Request.find()
      .sort({
        createdAt: -1,
      });
  };

export const updateStatus =
  async (
    id: string,
    status: string
  ) => {
    return await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  };

export const getRequestCount =
  async () => {
    return await Request.countDocuments();
  };