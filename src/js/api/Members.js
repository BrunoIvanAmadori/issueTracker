/**
 * Model for the Member object
 */

export class Member {
  constructor(params) {
    this.name = params.name;
    this.avatarUrl = params.avatarUrl;
  }
}

/**
 * Main class for fetching the Members data from Github and delivering it to the app
 */

export class MembersController {
  constructor(octokit, memberSerializer, config) {
    this.octokit = octokit;
    this.memberSerializer = memberSerializer;
    this.token = config.token;
    this.org = config.org;
  }

  async getAllMembers() {
    try {
      const response = await this.octokit.request("GET /orgs/{org}/members", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
        org: this.org,
      });

      const deserializedData = response.data.map((member) => {
        return this.memberSerializer.deSerialize(member);
      });

      return deserializedData.map((params) => new Member(params));
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Main class for fetching the Member data from Github and delivering it to the app
 */

export class MembersSerializer {
  deSerialize(data) {
    return {
      name: data.login,
      avatarUrl: data.avatar_url,
    };
  }
}
