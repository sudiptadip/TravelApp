import { Header } from "components";
import React from "react";
import { cn, formatDate } from "~/lib/utils";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import {
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-charts";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users, total };
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;
  return (
    <main className="all-users wrapper">
      <Header
        title={`Manage Users`}
        description={"Filter, Sort and access details users"}
      />
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            // @ts-ignore
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4 ">
                <img
                  referrerPolicy="no-referrer"
                  src={props.imageUrl}
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            // @ts-ignore
            field="email"
            headerText="Email Address"
            width="200"
            textAlign="Left"
          />

          <ColumnDirective
            // @ts-ignore
            field="joinedAt"
            headerText="Date Joined"
            width="140"
            textAlign="Left"
            template={({ joinedAt }: { joinedAt: string }) =>
              formatDate(joinedAt)
            }
          />

          {/* <ColumnDirective
            field="itineraryCreated"
            headerText="Trip Created"
            width="130"
            textAlign="Left"
          /> */}

          <ColumnDirective
            // @ts-ignore
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={({ status }: UserData) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    status === "user" ? "text-success-700" : "text-gray-500"
                  )}
                >
                  {status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
