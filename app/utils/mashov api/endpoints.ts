export const baseUrl = 'https://web.mashov.info/api';
export const apiVersion = '3.20190301';
export const appName = 'com.mashov.main';

export const endpoints = {
  schools: `${baseUrl}/schools`,
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`,

  conversations: {
    inbox: `${baseUrl}/mail/inbox/conversations`,
    archive: `${baseUrl}/mail/archive/conversations`,
    unread: `${baseUrl}/mail/unread/conversations`,
    deleted: `${baseUrl}/mail/deleted/conversations`,
    sent: `${baseUrl}/mail/sent/conversations`,
    drafts: `${baseUrl}/mail/drafts/conversations`,
    search: (searchQuery: string) => `${baseUrl}/mail/search/${searchQuery}/conversations`,
    single: (convId: string) => `${baseUrl}/mail/conversations/${convId}`,
  },

  grades: (userId: string) => `${baseUrl}/students/${userId}/grades`,
  bagrutGrades: (userId: string) => `${baseUrl}/students/${userId}/bagrut/grades`,
  etiquette: (userId: string) => `${baseUrl}/students/${userId}/behave`,
  lessonsCount: (userId: string) => `${baseUrl}/students/${userId}/lessonsCount`,
  bells: `${baseUrl}/bells`,
  timetable: (userId: string) => `${baseUrl}/students/${userId}/timetable`,

  files: {
    all: (userId: string) => `${baseUrl}/students/${userId}/files`,
    single: (userId: string, fileId: string, fileName: string) => `${baseUrl}/students/${userId}/files/${fileId}/${fileName}`,
  },

  groups: (userId: string) => `${baseUrl}/students/${userId}/groups`,

  contacts: {
    student: (userId: string) => `${baseUrl}/students/${userId}/alfon`,
    group: (groupId: string) => `${baseUrl}/groups/${groupId}/alfon`,
  },

  onlineLessons: {
    all: `${baseUrl}/bbb`,
    join: (lessonId: string) => `${baseUrl}/bbb/join/${lessonId}`,
  },
};