defmodule TimesheetSpaWeb.WorkerView do
  use TimesheetSpaWeb, :view
  alias TimesheetSpaWeb.WorkerView

  def render("index.json", %{workers: workers}) do
    %{data: render_many(workers, WorkerView, "worker.json")}
  end

  def render("show.json", %{worker: worker}) do
    %{data: render_one(worker, WorkerView, "worker.json")}
  end

  def render("worker.json", %{worker: worker}) do
    %{id: worker.id,
      name: worker.name,
      email: worker.email,
      password_hash: worker.password_hash}
  end
end
