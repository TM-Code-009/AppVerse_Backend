import Hire from "./hire.model";

export const createHire =
  async (
    data: any
  ) => {
    return Hire.create(data);
  };

export const getHires =
  async () => {
    return Hire.find()
      .sort({
        createdAt: -1,
      });
  };

  export const deleteHire =
  async (id: string) => {
    return Hire.findByIdAndDelete(
      id
    );
  };