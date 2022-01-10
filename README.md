# issueTracker

A project for tracking GitHub Issues by priority.
Made by Bruno Amadori for Rotunda Software.

_Featuring:_

1. _Webpack bundling._
2. _Bootstrap + SASS styling._
3. _Vanilla JS component-based structure._
4. _Views templating with Nunjucks._
5. _State management via Redux._

If you want to check this project builded **ASAP**, check this link:

https://brunoamadori.com/issuesTracker

---

## Installation steps

#### 1. **Clone**

`git clone https://github.com/BrunoIvanAmadori/IssueTracker.git`

#### 2. **Install**
`cd IssueTracker`
`npm i`

#### 3. **Get token**

Create a github Personal Access Token on: https://github.com/settings/tokens

Copy it, and paste it like this on your console:

`echo "TOKEN=<Insert Token here>" > .env`

#### 4. **Set DEV Server (optional)**

You can develop via webpack-dev-server

`npm run serve`

#### 5. **Build**

You can build your project
`npm run build:prod`
