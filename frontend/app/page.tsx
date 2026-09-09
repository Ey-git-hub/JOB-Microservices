import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 font-mono dark:bg-black ml-7">
      <h1 className="mt-10  text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
        Track,Organize,and Land Your Next Job Effortlessly
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
        Say goodbye to chaotic spreadsheets. Keep all your job applications,
        interview schedules, and follow-ups organized in one clean dashboard.
      </p>
    </div>
  );
}
