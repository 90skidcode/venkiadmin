export default function AddProduct() {
  return (
    <>
      <div className="col-span-10">
        <div className="m-5">
          <form action="#" method="POST">
            <div className="col-span-10 m-5">
              <div className="flex justify-between flex-wrap">
                <div className="text-primary-900 text-3xl font-bold">
                  <h1>Add Customer ✨</h1>
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-sm  border border-slate-300 mt-5">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Add Customer</h2>
                </header>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-400"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 h-8 shadow-sm px-3 rounded sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-400"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 h-8 shadow-sm px-3 rounded sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-400"
                      >
                        Age
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 h-8 shadow-sm px-3 rounded sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                      />
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-400"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 h-8 shadow-sm px-3 rounded sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                      />
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-gold-900 bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
