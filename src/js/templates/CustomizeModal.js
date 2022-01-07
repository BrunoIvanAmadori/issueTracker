export const CustomizeModal = (data) => {
  const view = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Customize the weight of the priority labels.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${data
              .map(
                (item) => `
            <label for="${item.name}" class="form-label">${item.name}</label>
            <input type="text" value="${item.value}" class="form-control" id="${item.name}" aria-describedby="emailHelp">`
              )
              .join(" ")}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary saveChanges">Save changes</button>
          </div>
        </div>
      </div>
    </div>`;

  return view;
};
