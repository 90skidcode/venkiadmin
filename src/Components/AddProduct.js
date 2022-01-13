export default function AddProduct() {
  return (
    <>
      <div className="col-span-10">
        <div className="m-5">
          <div>
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="bg-gold-600 p-2 px-5">
                  <h4 className="text-purple-900 font-bold">Add Product</h4>
                </div>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-full shadow-sm sm:text-sm border border-gold-600"
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-full shadow-sm sm:text-sm border border-gold-600"
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-full shadow-sm sm:text-sm border border-gold-600"
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-full shadow-sm sm:text-sm border border-gold-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-gold-900 bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
