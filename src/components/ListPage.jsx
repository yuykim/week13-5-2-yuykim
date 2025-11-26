// src/components/ListPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlayers, deletePlayer } from "./api";

function ListPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadList = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchPlayers();
      setPlayers(data);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`${id}번 선수를 정말 삭제하시겠습니까?`)) return;
    try {
      await deletePlayer(id);
      await loadList();
      alert("삭제되었습니다.");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">유명 스포츠 선수 목록</h2>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={loadList}
            disabled={loading}
          >
            {loading ? "불러오는 중..." : "불러오기 (Read)"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create")}
          >
            입력하기 (Create)
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div id="div_list">
        {players.length === 0 ? (
          <div className="text-muted">데이터가 없습니다.</div>
        ) : (
          players.map((each) => (
            <div
              key={each.id}
              className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
            >
              <div>
                <strong>[{each.id}]</strong> {each.name} / {each.height}cm /{" "}
                {each.weight}kg / No.{each.number}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-info me-1"
                  onClick={() => navigate(`/detail/${each.id}`)}
                >
                  상세
                </button>
                <button
                  className="btn btn-sm btn-outline-warning me-1"
                  onClick={() => navigate(`/update/${each.id}`)}
                >
                  수정
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(each.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListPage;
