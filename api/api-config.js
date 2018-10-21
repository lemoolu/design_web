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
  solutionEdit: { method: 'put', url: '/api/solution' },
  solutionList: { method: 'get', url: '/api/solution/list' },
  solutionVote: { method: 'post', url: '/api/solution/vote' },

  commentAdd: { method: 'post', url: '/api/comment' },
  commentList: { method: 'get', url: '/api/comment/list' },


  storyList: { method: 'get', url: '/api/admin/story/list' },
  storyDetail: { method: 'get', url: '/api/admin/story' },


  adminLogin: { method: 'post', url: '/api/admin/login' },
  adminInfo: { method: 'get', url: '/api/admin/auth/info' },
  adminProblemList: { method: 'get', url: '/api/admin/problem/list' },
  adminProblemVeify: { method: 'post', url: '/api/admin/problem/verify' },

  adminSolutionList: { method: 'get', url: '/api/admin/solution/list' },
  adminSolutionVerify: { method: 'post', url: '/api/admin/solution/verify' },

  adminCommentList: { method: 'get', url: '/api/admin/comment/list' },
  adminCommentVerify: { method: 'post', url: '/api/admin/comment/verify' },

  adminUserList: { method: 'get', url: '/api/admin/user/list' },

  adminStoryAdd: { method: 'post', url: '/api/admin/story' },
  adminStoryDetail: { method: 'get', url: '/api/admin/story' },
  adminStoryDel: { method: 'delete', url: '/api/admin/story' },
  adminStoryUpdate: { method: 'put', url: '/api/admin/story' },
  adminStoryList: { method: 'get', url: '/api/admin/story/list' },

  adminInvitecodeList: { method: 'get', url: '/api/admin/invitecode/list' },
  adminInvitecodeGen: { method: 'post', url: '/api/admin/invitecode/gen' },
};
