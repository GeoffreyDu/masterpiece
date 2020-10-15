package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventDtoUpdate;
import fr.formation.masterpieceback.dtos.EventViewDto;
import org.springframework.data.domain.Page;

public interface EventService {
    void create(EventDto dto);
    void update(Long id, EventDtoUpdate dto);
    void delete(Long id);
    EventViewDto get(Long id);
    Page<EventViewDto> getAllEventByUser(Long userId, int page, int size);
}
