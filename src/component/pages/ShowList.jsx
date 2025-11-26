import React, { useEffect, useState } from "react";

const MOCKAPI = "https://69185d5e21a96359486fcf5b.mockapi.io/players";

function ShowList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add 모달 상태
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    height: "",
    weight: "",
    number: "",
  });

  // Edit 모달 상태
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    number: "",
  });

  const isSuccess = (status) => status >= 200 && status < 300;

  // ------------------- 리스트 불러오기 -------------------
  const loadList = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(MOCKAPI, {
        headers: { "content-type": "application/json" },
      });
      if (!isSuccess(res.status)) {
        throw new Error(`status: ${res.status}`);
      }
      const data = await res.json();
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

  // ------------------- Add 폼 변경 -------------------
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------- Edit 폼 변경 -------------------
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------- Add 모달 열기/닫기 -------------------
  const openAddModal = () => {
    setAddForm({
      name: "",
      height: "",
      weight: "",
      number: "",
    });
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  // ------------------- Edit 모달 열기/닫기 -------------------
  const openEditModal = (player) => {
    setEditForm({
      id: player.id,
      name: player.name,
      height: player.height,
      weight: player.weight,
      number: player.number,
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  // ------------------- ADD: 추가하기 -------------------
  const handleAddSave = async (e) => {
    e.preventDefault();
    const { name, height, weight, number } = addForm;

    if (!name || !height || !weight || !number) {
      alert("선수의 이름, 키, 몸무게, 등번호를 빠짐없이 입력하세요.");
      return;
    }

    const body = {
      name: String(name),
      height: Number(height),
      weight: Number(weight),
      number: Number(number),
    };

    try {
      const res = await fetch(MOCKAPI, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!isSuccess(res.status)) {
        throw new Error(`status: ${res.status}`);
      }
      await loadList();
      closeAddModal();
      alert("등록되었습니다.");
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // ------------------- EDIT: 수정하기 -------------------
  const handleEditSave = async (e) => {
    e.preventDefault();
    const { id, name, height, weight, number } = editForm;

    if (!id) {
      alert("수정할 ID가 없습니다.");
      return;
    }
    if (!name || !height || !weight || !number) {
      alert("선수의 이름, 키, 몸무게, 등번호를 빠짐없이 입력하세요.");
      return;
    }

    const body = {
      name: String(name),
      height: Number(height),
      weight: Number(weight),
      number: Number(number),
    };

    try {
      const res = await fetch(`${MOCKAPI}/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!isSuccess(res.status)) {
        throw new Error(`status: ${res.status}`);
      }
      await loadList();
      closeEditModal();
      alert("수정되었습니다.");
    } catch (err) {
      console.error(err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // ------------------- 삭제 -------------------
  const handleDelete = async (id) => {
    if (!window.confirm(`${id}번 선수를 정말 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`${MOCKAPI}/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (!isSuccess(res.status)) {
        throw new Error(`status: ${res.status}`);
      }
      await loadList();
      alert("삭제되었습니다.");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // ------------------- 화면 렌더링 -------------------
  return (
    <div className="p-4">
      {/* 헤더 영역 */}
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
          <button className="btn btn-primary" onClick={openAddModal}>
            입력하기 (Create)
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* 리스트 영역 */}
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
                  className="btn btn-sm btn-outline-warning me-1"
                  onClick={() => openEditModal(each)}
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

      {/* ----------------- ADD MODAL (React 버전) ----------------- */}
      {isAddOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleAddSave}>
                  <div className="modal-header">
                    <h5 className="modal-title">선수 추가</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeAddModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      name="name"
                      className="form-control mb-2"
                      placeholder="Name"
                      value={addForm.name}
                      onChange={handleAddChange}
                    />
                    <input
                      name="height"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Height (cm)"
                      value={addForm.height}
                      onChange={handleAddChange}
                    />
                    <input
                      name="weight"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Weight (kg)"
                      value={addForm.weight}
                      onChange={handleAddChange}
                    />
                    <input
                      name="number"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Number"
                      value={addForm.number}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeAddModal}
                    >
                      닫기
                    </button>
                    <button type="submit" className="btn btn-primary">
                      추가하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ----------------- EDIT MODAL (React 버전) ----------------- */}
      {isEditOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleEditSave}>
                  <div className="modal-header">
                    <h5 className="modal-title">선수 수정</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeEditModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      name="id"
                      className="form-control mb-2"
                      placeholder="ID"
                      value={editForm.id}
                      readOnly
                    />
                    <input
                      name="name"
                      className="form-control mb-2"
                      placeholder="Name"
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                    <input
                      name="height"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Height (cm)"
                      value={editForm.height}
                      onChange={handleEditChange}
                    />
                    <input
                      name="weight"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Weight (kg)"
                      value={editForm.weight}
                      onChange={handleEditChange}
                    />
                    <input
                      name="number"
                      type="number"
                      className="form-control mb-2"
                      placeholder="Number"
                      value={editForm.number}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeEditModal}
                    >
                      닫기
                    </button>
                    <button type="submit" className="btn btn-warning">
                      수정하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowList;
