package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventViewDto;
import fr.formation.masterpieceback.entities.Event;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.EventRepository;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventServiceImpl implements EventService{
    private final EventRepository eventRepo;
    private final UserRepository userRepo;

    public EventServiceImpl(EventRepository eventRepo, UserRepository userRepo) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void create(EventDto dto){
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDateTime(dto.getDateTime());
        event.setDescription(dto.getDescription());
        User user = userRepo.findById(dto.getUserId()).get();
        event.setUserId(user);
        eventRepo.save(event);
    }

    @Override
    public void update(Long id, EventDto dto){
        Event event = eventRepo.findById(id).get();
        event.setTitle(dto.getTitle());
        event.setDateTime(dto.getDateTime());
        event.setDescription(dto.getDescription());
        Long userId = dto.getUserId();
        User user = null;

        eventRepo.save(event);
    }

    @Override
    public void delete(Long id){
        eventRepo.deleteById(id);
    }

    @Override
    public EventViewDto get(Long id){
        return eventRepo.getById(id);
    }
}
