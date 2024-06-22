import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearMessage,
  GetSellerById,
  UpdateSellerStatus,
} from "../../store/Reducers/SellerReducer";
import toast from "react-hot-toast";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { seller, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );
  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(UpdateSellerStatus({ sellerId, status }));
  };

  useEffect(() => {
    dispatch(GetSellerById(sellerId));
  }, [sellerId]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch]);

  useEffect(() => {
    console.log(seller);
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);
  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3"> Seller Details </h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="w-full flex flex-wrap text-[#d0d2d6]">
          <div className="flex items-center justify-center w-3/12 py-3">
            <div>
              {seller?.image ? (
                <img
                  className="w-full h-[230px]"
                  src="http://localhost:3000/images/demo.jpg"
                  alt=""
                />
              ) : (
                <span>Image Not Uploaded</span>
              )}
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Name : </span>
                  <span>{seller?.name} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Email : </span>
                  <span>{seller?.email} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Role : </span>
                  {/* Chữ cái đầu viết hoa */}
                  <span>{seller?.role} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Status : </span>
                  <span>{seller?.status} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Payment Status : </span>
                  <span>{seller?.payment} </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>

              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md">
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Shop Name : </span>
                  <span>{seller?.shopInfo?.shopName} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Divission : </span>
                  <span>{seller?.shopInfo?.division} </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>District : </span>
                  <span>{seller?.shopInfo?.district} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>State : </span>
                  <span>{seller?.shopInfo?.sub_district} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={submit}>
            <div className="flex gap-4 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                name=""
                id=""
                required
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="deactive">Deactive</option>
              </select>
              <button className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SellerDetails;
