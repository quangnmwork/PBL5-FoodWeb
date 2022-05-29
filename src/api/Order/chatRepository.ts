import axiosClient from '../repository';
const path = 'RoomDetail';
export default {
  getAllMessages(id: number) {
    return axiosClient.get(`${path}/${id}`);
  }
};
