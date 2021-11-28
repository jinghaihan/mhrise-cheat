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
    title: '公会名片',
    icon: 'idcard',
    target: 'guildCards',
    activeRule: '',
    children: [
      {
        title: '统计信息',
        icon: 'bar-chart',
        target: 'statistics',
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
      },
      {
        title: '狩猎记录',
        icon: 'crown',
        target: 'huntingLog',
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
