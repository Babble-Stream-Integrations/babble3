/* eslint-disable @typescript-eslint/no-explicit-any */
export default function resultsComponent(results: any) {
  return (
    <div className=" w-[570px] ">
      <div className="flex flex-col gap-[10px] overflow-hidden text-center font-[500] text-babbleWhite">
        <div className="flex h-[150px] w-[570px] flex-col items-center justify-between  rounded-t-3xl bg-babbleDarkGray py-4 text-5xl">
          <div className="h-[90px] px-4">
            <h1>Results</h1>
          </div>
        </div>
        <div className="flex h-[75px] flex-col items-center overflow-hidden rounded-lg rounded-bl-3xl bg-babbleDarkGray text-center">
          {/* go over results and return all usernames and points, also sort them on points */}
          {results.results
            .sort((a: any, b: any) => b.points - a.points)
            .map((result: any, index: number) => {
              return (
                <div key={index} className="flex w-full pl-8">
                  <div className="flex w-1/2 gap-2">
                    <h2
                      dangerouslySetInnerHTML={{
                        __html:
                          index === 0
                            ? "&#129351;"
                            : "" || index === 1
                            ? "&#129352;"
                            : "" || index === 2
                            ? "&#129353;"
                            : "",
                      }}
                    ></h2>
                    <h2>{result.username}</h2>
                  </div>
                  <div className="w-1/2 text-left">
                    <h2>{result.points}</h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
