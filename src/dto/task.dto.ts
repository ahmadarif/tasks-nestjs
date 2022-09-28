import { IsNotEmpty } from "class-validator";

export class TaskDto {
    id: string;

    @IsNotEmpty()
    taskName: string;

    @IsNotEmpty()
    taskDesc: string;
}