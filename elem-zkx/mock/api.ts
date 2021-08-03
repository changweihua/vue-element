import Mock, { Random } from 'mockjs'

export default {
  getJobList: () => {
    const announcements = []

    for (let i = 0; i < 10; i++) {
      const announcement = {
        id: Random.id(), // 身份证号
        announcementId: Random.guid(),
        loginName: Random.name(),
        age: Random.integer(20, 50),
        asset: Random.float(200, 500000, 1, 6),
        userName: Random.cname(),
        userEmail: Random.email(),
        cellPhone: Mock.mock(/^1[385][1-9]\d{8}/),
        isVerified: Random.boolean(),
        isCompanyVerified: Random.boolean(),
        address: `${Random.province()}${Random.city()}${Random.county()}`, //Random.ctitle(5, 10),
        userRoles: [],
        roleNames: []
      }
      announcements.push(announcement)
    }

    const result = {
      code: 200,
      data: {
        columns: [
          {
            title: '\u767B\u5F55\u540D\u79F0',
            isRowKey: false,
            dataIndex: 'loginName',
            key: 'loginName',
            align: 'center',
            ellipsis: false,
            order: 1,
            isSlotColumn: false
          },
          {
            title: '\u7528\u6237\u540D',
            isRowKey: false,
            dataIndex: 'userName',
            key: 'userName',
            align: 'center',
            ellipsis: false,
            order: 2,
            isSlotColumn: false
          },
          {
            title: '\u7535\u5B50\u90AE\u7BB1',
            isRowKey: false,
            dataIndex: 'userEmail',
            key: 'userEmail',
            align: 'center',
            ellipsis: false,
            order: 3,
            isSlotColumn: false
          },
          {
            title: '\u624B\u673A\u53F7',
            isRowKey: false,
            dataIndex: 'cellPhone',
            key: 'cellPhone',
            align: 'center',
            ellipsis: false,
            order: 4,
            isSlotColumn: false
          },
          {
            scopedSlots: { customRender: 'isVerified' },
            slots: { customRender: 'isVerified' },
            title: '\u5DF2\u8BA4\u8BC1',
            isRowKey: false,
            dataIndex: 'isVerified',
            key: 'isVerified',
            align: 'center',
            ellipsis: false,
            order: 5,
            isSlotColumn: true
          },
          {
            scopedSlots: { customRender: 'isCompanyVerified' },
            slots: { customRender: 'isCompanyVerified' },
            title: '\u516C\u53F8\u5DF2\u8BA4\u8BC1',
            isRowKey: false,
            dataIndex: 'isCompanyVerified',
            key: 'isCompanyVerified',
            align: 'center',
            ellipsis: false,
            order: 6,
            isSlotColumn: true
          },
          {
            title: '\u6240\u5C5E\u516C\u53F8',
            isRowKey: false,
            dataIndex: 'companyName',
            key: 'companyName',
            align: 'center',
            ellipsis: false,
            order: 7,
            isSlotColumn: false
          },
          {
            title: '\u6240\u5C5E\u89D2\u8272',
            isRowKey: false,
            dataIndex: 'roleNames',
            key: 'roleNames',
            align: 'center',
            ellipsis: false,
            order: 8,
            isSlotColumn: false
          },
          {
            scopedSlots: { customRender: 'operation' },
            slots: { customRender: 'operation' },
            title: '\u64CD\u4F5C',
            isRowKey: false,
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            ellipsis: false,
            order: 0,
            isSlotColumn: false
          }
        ],
        items: announcements,
        totalCount: 55,
        isLastPage: false
      },
      message: '',
      isSuccess: true
    }

    return result
  }
}
