import { Injectable, Inject, Logger } from '@nestjs/common';

export enum ActivityType {
    Book = 0,
    Course = 1,
    Event = 2,
    Leadership = 3,
    Project = 4,
}

@Injectable()
export class ClickupService {
    private readonly logger = new Logger(ClickupService.name)

    /**
     * Cria uma tarefa no ClickUp.
     * @param cycle — ciclo (string)
     * @param quantity — quantidade (number)
     * @param type — tipo de atividade (ActivityType)
     */
    async createPersonalTask(
        title: string,
        description: string,
        cycle: string,
        quantity: number,
        type: ActivityType,
        listId = '901305483495'
    ): Promise<void> {
        const clickUpToken = process.env.CLICKUP_TOKEN;

        if (!clickUpToken) {
            throw new Error('Token Clickup is not defined')
        }

        const payload = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: clickUpToken
            },
            body: JSON.stringify({
                name: title,
                description: description,
                custom_fields: [
                    { id: 'd1a92a15-7575-4fe1-88e0-b42d9de7edbe', value: cycle },
                    { id: 'ea7cd29c-dab8-474c-8001-42534715c59f', value: quantity },
                    { id: 'e45f3d4a-91fd-4a37-8d92-076e75b8da6b', value: type },
                ]
            })
        };

        try {
            fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, payload)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(err => console.error(err));
        } catch (error: any) {
            if (error.response) {
                this.logger.error('Erro na API ClickUp:', error.response.status, error.response.data);
            } else {
                this.logger.error('Erro ao tentar criar tarefa:', error.message);
            }
        }
    }
}
