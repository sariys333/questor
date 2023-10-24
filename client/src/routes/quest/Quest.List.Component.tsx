import { Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    changePageTitle,
    fetchQuestByQuestId,
    fetchQuestsByUserId,
} from "../../store/Quest.Slice";
import store, { AppState } from "../../store/Store";

const { Title } = Typography;

export function QuestListComponent() {
    // const [events, setEvents] = useState<GenericEvent[]>();

    const state = useSelector((state: AppState) => state.quest.listComp);
    const user = useSelector((state: AppState) => state.user.user);
    const { list, loading, combined } = state;

    const now = new Date(Date.now());

    useEffect(() => {
        store.dispatch(changePageTitle("목록"));
        store.dispatch(fetchQuestsByUserId(user?.userId));
    }, []);

    console.log(combined);

    const onClick = (e: any) => {
        const questId: string = e.target.id;
        if (questId) {
            store.dispatch(fetchQuestByQuestId(questId));
        }
    };

    const time = (to: Date) => {
        if (now && to > now) {
            return dayjs(now.getTime()).to(to);
        } else if (now && to < now) {
            return dayjs(to).from(now.getTime());
        }
    };

    return (
        <div>
            {/* <Flex justify="flex-end" style={{ margin: 5 }}>
                <Title level={3}>
                <Link to={"/quest/create"}>CREATE</Link>
                </Title>
            </Flex> */}
            {/* <QuestCalendar /> */}
            <Table
                loading={loading == undefined}
                dataSource={list}
                style={{ whiteSpace: "pre" }}
                pagination={{
                    defaultPageSize: 5,
                }}
                tableLayout={"auto"}
                columns={[
                    {
                        key: "questId",
                        title: "목표",
                        // dataIndex: "category",
                        render: (text, r) => (
                            <pre style={{ margin: 0 }}>
                                <Typography>
                                    {combined
                                        ? `${Object.values(
                                              combined[r.questId].objectives
                                          )
                                              .map((obj: Object) => {
                                                  if ("category" in obj) {
                                                      return obj.category;
                                                  } else {
                                                      return "없음";
                                                  }
                                              })
                                              .join("\n")}`
                                        : ""}
                                </Typography>
                            </pre>
                        ),
                    },
                    {
                        key: "questId",
                        title: "내용",
                        // dataIndex: "content",
                        ellipsis: true,
                        render: (text, r) => (
                            <pre style={{ margin: 0 }}>
                                <Typography>
                                    {combined
                                        ? Object.values(
                                              combined[r.questId].objectives
                                          ).length
                                        : 0}
                                </Typography>
                            </pre>
                        ),
                        children: [
                            {
                                render: (text, r) => (
                                    <pre style={{ margin: 0 }}>
                                        <Typography>
                                            {combined
                                                ? Object.values(
                                                      combined[r.questId]
                                                          .objectives
                                                  )
                                                      .map((obj: Object) => {
                                                          if (
                                                              "content" in obj
                                                          ) {
                                                              return obj.content;
                                                          } else {
                                                              return "없음";
                                                          }
                                                      })
                                                      .join("\n")
                                                : ""}
                                        </Typography>
                                    </pre>
                                ),
                            },
                        ],
                    },
                    {
                        key: "questId",
                        title: "진행상황",
                        // dataIndex: "completed",
                        render: (text, r) => (
                            <pre style={{ margin: 0 }}>
                                <Typography>
                                    {combined
                                        ? Object.values(
                                              combined[r.questId].objectives
                                          )
                                              .map((obj: Object) => {
                                                  if (
                                                      "targetReps" in obj &&
                                                      "currentReps" in obj
                                                  ) {
                                                      if (
                                                          obj.targetReps ==
                                                          obj.currentReps
                                                      ) {
                                                          return "완료";
                                                      }
                                                      return `${obj.currentReps} / ${obj.targetReps} 회`;
                                                  } else {
                                                      return "없음";
                                                  }
                                              })
                                              .join("\n")
                                        : ""}
                                </Typography>
                            </pre>
                        ),
                    },
                    {
                        key: "questId",
                        title: "만료일",
                        dataIndex: "completed",
                        render: (v, r, i) => {
                            return v ? (
                                combined ? (
                                    combined[r.questId].completed
                                ) : (
                                    ""
                                )
                            ) : combined ? (
                                now && combined[r.questId].to < now ? (
                                    <>
                                        기간 만료 :{" "}
                                        {time(combined[r.questId].to)}
                                    </>
                                ) : (
                                    <>
                                        남은시간 :{" "}
                                        {time(combined[r.questId].to)}
                                    </>
                                )
                            ) : (
                                ""
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
