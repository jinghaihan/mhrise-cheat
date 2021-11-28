const menu = [
  {
    title: '首页',
    icon: 'home',
    target: 'home',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '杂货店',
    icon: 'shopping',
    target: 'item',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '神秘炼金',
    icon: 'gift',
    target: 'talisman',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '随从看板',
    icon: 'bell',
    target: 'buddy',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '猎人笔记',
    icon: 'read',
    target: 'huntingLog',
    activeRule: '',
    children: [
      {
        title: '狩猎记录',
        icon: 'profile',
        target: 'count',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '金冠',
        icon: 'crown',
        target: 'crowns',
        activeRule: '/mhrise-cheat/',
        children: []
      }
    ]
  },
  {
    title: '公会名片',
    icon: 'idcard',
    target: 'guildCards',
    activeRule: '',
    children: [
      {
        title: '猎人等级',
        icon: 'rise',
        target: 'hunterRank',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '任务完成次数',
        icon: 'number',
        target: 'questCompleted',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '武器使用次数',
        icon: 'bar-chart',
        target: 'weaponUsage',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '勋章',
        icon: 'trophy',
        target: 'awards',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '斗技大会',
        icon: 'schedule',
        target: 'arenaRecords',
        activeRule: '/mhrise-cheat/',
        children: []
      }
    ]
  },
  {
    title: '其他',
    icon: 'appstore',
    target: 'other',
    activeRule: '/mhrise-cheat/',
    children: []
  }
]

export default menu
