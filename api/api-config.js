export default {
  test: { method: 'get', url: '/api/dns/group/list' },
  authInfo: { method: 'get', url: '/api/auth/info' },
  authLogin: { method: 'post', url: '/api/log/in' },
  authSignup: { method: 'post', url: '/api/sign/up' },
  authInfoUpdate: { method: 'post', url: '/api/auth/info/update' },
  authGetMyProblem: { method: 'get', url: '/api/auth/get/my/problem' },

  problemAdd: { method: 'post', url: '/api/problem' },
  problemDel: { method: 'delete', url: '/api/problem' },
  problemUpdate: { method: 'put', url: '/api/problem' },
  problemDetail: { method: 'get', url: '/api/problem' },
  problemList: { method: 'get', url: '/api/problem/list' },
  problemStar: { method: 'post', url: '/api/problem/star' },

  solutionAdd: { method: 'post', url: '/api/solution' },
  solutionList: { method: 'get', url: '/api/solution/list' },
  solutionVote: { method: 'post', url: '/api/solution/vote' },

  commentAdd: { method: 'post', url: '/api/comment' },
  commentList: { method: 'get', url: '/api/comment/list' },

};
