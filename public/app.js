document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const title = event.target.dataset.title;
  const submitBtn = document.querySelector(
    `[data-type='submit'][data-id='${id}']`
  );
  const cancelBtn = document.querySelector(
    `[data-type='cancel'][data-id='${id}']`
  );
  const editBtn = document.querySelector(`[data-type='edit'][data-id='${id}']`);
  const remvoeBtn = document.querySelector(
    `[data-type='remove'][data-id='${id}']`
  );
  const changeInput = document.querySelector(
    `[data-type='inputField'][data-id='${id}']`
  );
  const span = document.querySelector(
    `[data-type='inputSpan'][data-id='${id}']`
  );

  const changeArray = [
    submitBtn,
    cancelBtn,
    editBtn,
    remvoeBtn,
    changeInput,
    span,
  ];
  function setVisibility(array) {
    array.forEach((item) => item.classList.toggle("visually-hidden"));
  }

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    setVisibility(changeArray);
  }
  if (event.target.dataset.type === "submit") {
    const newTitle = changeInput.value;
    if (newTitle !== null) {
      edit({ id, title: newTitle }).then(() => {
        event.target.closest("li").querySelector("span").innerText = newTitle;
      });
    }
    setVisibility(changeArray);
  }
  if (event.target.dataset.type === "cancel") {
    changeInput.value = title;
    setVisibility(changeArray);
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}
