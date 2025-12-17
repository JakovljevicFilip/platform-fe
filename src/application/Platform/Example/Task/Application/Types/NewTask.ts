/**
 * NewTask
 * -----------------------------------------------------------------------------
 * ApplicationEntity used when creating a new Task.
 * Contains only UI-facing input required for TaskAggregate.record().
 */
import { type ApplicationEntity } from "src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity";

export interface NewTask extends ApplicationEntity {
  body: string
}
