package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.configuration.SecurityHelper;
import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventDtoUpdate;
import fr.formation.masterpieceback.dtos.EventViewDto;
import fr.formation.masterpieceback.entities.Event;
import fr.formation.masterpieceback.repositories.EventRepository;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static fr.formation.masterpieceback.configuration.SecurityHelper.getUserId;

@Service
public class EventServiceImpl implements EventService{
    private final EventRepository eventRepo;
    private final UserRepository userRepo;
    private final ModelMapper mapper;

    public EventServiceImpl(EventRepository eventRepo, UserRepository userRepo, ModelMapper mapper) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    @Override
    public void create(EventDto dto){
        /*Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDateTime(dto.getDateTime());
        event.setDescription(dto.getDescription());
        User user = userRepo.findById(dto.getUserId()).get();
        event.setUser(user);*/
        // Model Mapper
        Event event = mapper.map(dto, Event.class);
        eventRepo.save(event);
    }

    @Override
    public void update(Long id, EventDtoUpdate dto){
        Event event = eventRepo.findById(id).get();
        event.setTitle(dto.getTitle());
        event.setDateTime(dto.getDateTime());
        event.setDescription(dto.getDescription());

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

    @Override
    public Page<EventViewDto> getAllEventByUser(int page, int size) {
        Long userId = getUserId();
        Pageable pageable = PageRequest.of(page, size);
        Page<EventViewDto> eventList = eventRepo.findAllByUserId(userId, pageable);
        return eventList;
    }

}
