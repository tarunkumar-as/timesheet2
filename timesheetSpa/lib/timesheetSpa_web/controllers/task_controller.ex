defmodule TimesheetSpaWeb.TaskController do
  use TimesheetSpaWeb, :controller

  alias TimesheetSpa.Tasks
  alias TimesheetSpa.Tasks.Task

  action_fallback TimesheetSpaWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"description" => description, "status" => status, "job_id" => job_id, "worker_id" => worker_id, "hours" => hours}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(%{"description" => description, "status" => status, "job_id" => job_id, "worker_id" => worker_id, "hours" => hours}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"description" => description, "status" => status, "job_id" => job_id, "worker_id" => worker_id, "hours" => hours, "id" => id}) do
    task = Tasks.get_task!(id)
    task_params = %{"description" => description, "status" => status, "job_id" => job_id, "worker_id" => worker_id, "hours" => hours, "id" => id}
    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
