import Button3 from '@/containers/common/Button3/Button3';
import React from 'react';

const CheckOutForm = () => {
  return (
    <div>
        <form className="space-y-6">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-3xl font-light text-gray-800 sm:text-4xl">
          Confirm Your Order
          <span className="mt-2 block h-1 w-12 bg-[#be834f] sm:w-24"></span>
        </h1>
        <div className="mt-10 flex flex-col space-y-6">
          {/* Email Input */}
    

    

          {/* Delivery Section */}
          <div>
            <h2 className="text-xl font-extralight text-gray-800">Delivery</h2>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-extralight text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  // {...register("firstName")}
                  placeholder="First name"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                />
              </div>
             
            </div>

            {/* Address Section */}
            <div className="mt-4">
              <label
                htmlFor="address"
                className="text-sm font-extralight text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                required
                // {...register("address")}
                placeholder="Address"
                className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="phone_number"
                className="text-sm font-extralight text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone_number"
                required
                // {...register("phone_number")}
                placeholder="Phone"
                className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
              />
            </div>

            
          </div>
          
        </div>

        {/* Terms and Conditions */}
        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          By placing this order you agree to the
          <a
            href="#"
            className="text-teal-500 underline ml-1 hover:text-teal-700"
          >
            Terms and Conditions
          </a>
          .
        </p>
        <div className="mt-6 text-center">
          <button type="submit" className="w-full">
            <Button3
              text="CONFIRM ORDER"
              backgroundColor="#be834f"
              borderColor="#be834f"
              textColor="white"
            />
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default CheckOutForm;