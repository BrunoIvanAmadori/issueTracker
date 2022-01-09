import { getContrast } from "../../utils/getContrast";

export const IssueTemplate = (data) => {
  const view = `
    <div class="issue__card card " creator="${data.opener.name}">
      <div class="row">
        <div class="col-12 col-md-2">
          <div class="issue__score">
            <small class="issue__score-title">PRIORITY</small>
            <span class="issue__score-number ${data.score > 100 ? `text-danger` : []}">${data.score}</span>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="issue__body">
          <small>#${data.number}</small>
          <h4 class="issue__title">${data.title}</h4>
            <p class="issue__description">Opened ${data.relative_date_created} days ago by  <span class="issue__avatar-container">
            <img loading="lazy" class="issue__avatar" src="${data.opener.avatarUrl}">
            <span class="issue__avatar-name">${data.opener.name}</span>
          </span></p>
            ${data.labels
              .map(
                (label) =>
                  `<span class="issue__label"
                    style="background-color:#${label.color};
                    color:${getContrast("#" + label.color)}">${label.name}
                </span>`
              )
              .join(" ")}
          </div>
        </div>
      </div>
    </div>
  `;
  return view;
};
