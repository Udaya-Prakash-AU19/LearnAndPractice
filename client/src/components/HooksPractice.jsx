import { useEffect, useRef, useState, useMemo } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const slowMultiply = (count2) => {
  let iter = 0;
  for (let i = 0; i <= 1000000000; i++) {
    iter = i * count2;
  }
  console.log("slowMultiply", iter);
  return count2 * 2;
};

function HooksPractice() {
  const [count1, setCount1] = useState(0);
  const prevCount = usePrevious(count1);
  const [count2, setCount2] = useState(1);
  const [dark, setDark] = useState(false);

  const mulpliedResult = useMemo(() => {
    return slowMultiply(count2);
  }, [count2])

  const themeStyle =  useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    }
  }, [dark])


  useEffect(() => {
    console.log('Theme changed')
  }, [themeStyle])
  return (
    <div className="container">
      <div>
        <h2>Use Previous</h2>
        <div
          className="d-flex justify-content-between"
          style={{ width: "300px" }}
        >
          <div>
            Count1 <h3>{count1}</h3>
          </div>
          <div>
            Previous Count1 <h3>{prevCount}</h3>
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "300px" }}
        >
          <button
            className="btn btn-success"
            onClick={() => setCount1(count1 + 1)}
          >
            Increment
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setCount1(count1 - 1)}
          >
            Decrement
          </button>
        </div>
      </div>
      <div style={ themeStyle }>
        <h2>Use Memo</h2>
        <div
          className="d-flex justify-content-between"
          style={{ width: "300px" }}
        >
          <div>
            Count2 <h3>{count2}</h3>
          </div>
          <div>
            Two times of count2 <h3>{mulpliedResult}</h3>
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "300px" }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ width: "300px" }}
          >
            <button
              className="btn btn-success"
              onClick={() => {
                setCount2(count2 + 1)
              }}
            >
              Increment
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setCount2(count2 - 1)
              }}
            >
              Decrement
            </button>
            <button className="btn btn-primary"
              onClick={() => setDark(!dark)}
            >
              Change Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HooksPractice;
