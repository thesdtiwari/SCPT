import React from 'react';
import { useHistory } from 'react-router';
import Header from '../TPO/components/Header';
import Footer from '../TPO/components/Footer';

const links = [
  {
    name: 'Log In',
    nav: 'login',
  },
];

function forgotPassword(enrollment) {
  console.log('enrollment', enrollment);
  // TODO
  // integrate forgot password api
  return true;
}

function ForgotPassword() {
  const history = useHistory();
  return (
    <>
      <Header type="dashboardTpo" nav={links} />

      <div className="flex flex-col overflow-hidden">
        {/*  Page content */}
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h3 mb-4">
                    Let’s get you back up on your feet
                  </h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form
                    onSubmit={() => {
                      forgotPassword(
                        document.getElementById('enrollment').value
                      );
                      history.push('/home');
                    }}
                  >
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="enrollment"
                        >
                          Enrollment Number
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="enrollment"
                          type="text"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your Enrollment Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                          Send New Password Request
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
