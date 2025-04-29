import { Injectable, Logger } from '@nestjs/common';
import { CreateClickupDto } from './dto/create-clickup.dto';

@Injectable()
export class ClickupService {
    private readonly logger = new Logger(ClickupService.name);

    /**
   * Create a task in ClickUp
   *
   * @param dto — DTO data of the task to be created
   * @param title: string  
   * @param description?: string
   * @param cycle: string 
   * @param quantity: number
   * @param type: ActivityType
   * @param listId?: string
   * @returns {Promise<any>} response from ClickUp API.
   */
    async createPersonalTask(dto: CreateClickupDto): Promise<any> {
        try {
            const token = process.env.CLICKUP_TOKEN;

            if (!token) throw new Error('Token ClickUp não definido');

            const { title, description, cycle, quantity, type, listId = '901305483495' } = dto;


            const res = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({
                    name: title,
                    description,
                    custom_fields: [
                        { id: 'd1a92a15-7575-4fe1-88e0-b42d9de7edbe', value: cycle },
                        { id: 'ea7cd29c-dab8-474c-8001-42534715c59f', value: quantity },
                        { id: 'e45f3d4a-91fd-4a37-8d92-076e75b8da6b', value: type },
                    ],
                }),
            });

            if (!res.ok) {
                const errorBody = await res.text();

                this.logger.error(`Erro na API ClickUp: ${res.status} — ${errorBody}`);

                this.logger.error(`ClickUp retornou status ${res.status}`);
            }

            return res.json();
        } catch (error) {
            this.logger.error(`Error at create task: ${error}`);
        }
    }
}
