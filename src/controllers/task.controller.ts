import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { response, responseError } from "src/helpers/response.helper";
import { TaskDto } from "../dto/task.dto";
import { TaskService } from "../services/task.service";

//endpoint structure: host/prefix/path
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('listing')
    async getTask() {
        try {
            const result = await this.taskService.listing();
            return response('successfully get tasks',result);
        } catch (error) {
            return responseError(error.message);
        }
    }

    @Post('create')
    async createTask(@Body() body: TaskDto) {
        try {
            const result = await this.taskService.create(body);
            return response('successfully create task',result);
        } catch (error) {
            return responseError(error.message);
        }
    }

    @Post('getOne')
    async getOne(@Body() body: TaskDto){
        try {
            const result = await this.taskService.getOne(body);
            return response('successfully get one task', result);
        } catch (error) {
            return responseError(error.message);
        }
    }

    @Post('update')
    async update(@Body() body: TaskDto){
        try {
            const result = await this.taskService.update(body);
            return response('successfully update one task', result);
        } catch (error) {
            return responseError(error.message)
        }
    }

    @Post('mark')
    async mark(@Body() body: TaskDto){
        try {
            const result = await this.taskService.mark(body);
            return response('successfully mark one task', result);
        } catch (error) {
            return responseError(error.message)
        }
    }

    @Delete('delete')
    async delete(@Body() body: TaskDto){
        try {
            const result = await this.taskService.delete(body);
            return response('successfully delete one task', result);
        } catch (error) {
            return responseError(error.message)
        }
    }
}