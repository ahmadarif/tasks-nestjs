import { Injectable } from '@nestjs/common';
import { Task } from 'src/models/task';
import { TaskDto } from '../dto/task.dto';
import * as moment from 'moment'

@Injectable()
export class TaskService {
    async listing() {
        try {
            return await Task.createQueryBuilder('task')
            .select([
                'task.id',
                'task.taskName',
                'task.taskDesc',
                'task.status'
            ])
            .orderBy('task.createdDate','ASC')
            .getMany();
        } catch (error) {
            throw(error);
        }
    }

    async create(params: TaskDto) {
        try {
            const test = moment().format('yyyy-MM-DD HH:MM:SS');
            await Task.createQueryBuilder('task')
            .insert()
            .values({
                taskName: params.taskName,
                taskDesc: params.taskDesc,
                status: false,
                createdDate: test,
            })
            .execute();
            return params;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getOne(params:TaskDto){
        try {
            const result = await Task.createQueryBuilder('task')
            .where('task.id = :id', {id: params.id})
            .getOne();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async update(params:TaskDto) {
        try {
            const result = await Task.createQueryBuilder('task')
            .where('task.id = :id', {id: params.id})
            .update()
            .set({
                taskName: params.taskName,
                taskDesc: params.taskDesc,
            })
            .execute();
            return params;
        } catch (error) {
            throw error;
        }
    }

    async mark(params:TaskDto) {
        try {
            const result = await Task.createQueryBuilder('task')
            .where('task.id = :id', {id: params.id})
            .update()
            .set({
                status: true,
            })
            .execute();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(params:TaskDto) {
        try {
            await Task.createQueryBuilder('task')
            .where('task.id = :id', {id: params.id})
            .delete()
            .execute();
            return null;
        } catch (error) {
            throw error;
        }
    }
}