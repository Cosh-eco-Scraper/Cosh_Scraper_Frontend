import React from 'react';
import Description from '../../../components/Description';
import Brand from '../../../components/Brand';
import Openhours from '../../../components/Openinghours';
import Location from '../../../components/Location';

const ExamplePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#060023] py-8 text-white shadow-md">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-2 text-4xl font-extrabold">Your Company Info</h1>
          <h2 className="text-lg font-medium text-gray-200">
            Please verify if your store information is correct.
          </h2>
        </div>
      </header>

      {/* Main Content in a Grid */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <Description />
            </section>
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <Brand />
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <Location />
            </section>
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <Openhours />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamplePage;
