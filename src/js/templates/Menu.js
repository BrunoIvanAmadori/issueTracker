export const Menu = async (membersData) => {
  let view = `
    <div class="nav justify-content-center justify-content-md-start">
        <div class="memberFilter dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMemberFilter" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-filter me-2"></i>Filter by user
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMemberFilter">
            ${membersData
              .map(
                (member) => `
                <label class="list-group-item">
                    <input class="form-check-input me-1 memberFilter__checkbox" type="checkbox" value="${member.name}" aria-label="...">
                    <img loading="lazy" class="memberFilter__avatar" src="${member.avatarUrl}">
                    ${member.name}
                </label>`
              )
              .join(" ")}
            </ul>
        </div>
        <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-cog me-1"></i> Customize</button>
    </div>
    `;
  return view;
};
