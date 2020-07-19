package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventViewDto;


public interface EventService {
    void create(EventDto dto);
    void update(Long id, EventDto dto);
    void delete(Long id);
    EventViewDto get(Long id);
}
