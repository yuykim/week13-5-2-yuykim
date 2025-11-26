// src/components/CreatePage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "./api";

function CreatePage() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [number, setNumber] = useState("");

  const nameRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const numberRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("이름을 입력하세요.");
      nameRef.current.focus();
      return;
    }
    if (!height.trim()) {
      alert("키를 입력하세요.");
      heightRef.current.focus();
      return;
    }
    if (!weight.trim()) {
      alert("몸무게를 입력하세요.");
      weightRef.current.focus();
      return;
    }
    if (!number.trim()) {
      alert("등번호를 입력하세요.");
      numberRef.current.focus();
      return;
    }

    const body = {
      name: String(name),
      height: Number(height),
      weight: Number(weight),
      number: Number(number),
    };

    try {
      await createPlayer(body);
      alert("등록되었습니다.");
      navigate("/list");
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>선수 추가 (Create)</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          ref={nameRef}
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          ref={heightRef}
          type="number"
          className="form-control mb-2"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          ref={weightRef}
          type="number"
          className="form-control mb-2"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          ref={numberRef}
          type="number"
          className="form-control mb-2"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          추가하기
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
