package fr.formation.masterpieceback.services;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventDtoUpdate;
import fr.formation.masterpieceback.dtos.EventViewDto;
import fr.formation.masterpieceback.entities.Event;
import fr.formation.masterpieceback.entities.User;
import fr.formation.masterpieceback.repositories.EventRepository;
import fr.formation.masterpieceback.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static fr.formation.masterpieceback.configuration.SecurityHelper.getUserId;

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
        // Create object event
        Event event = new Event();
        // Convert Dto to entities
        // Set each attribute
        event.setTitle(dto.getTitle());
        event.setDateTime(dto.getDateTime());
        event.setDescription(dto.getDescription());
        // Retrieve user linked to the event
        User user = userRepo.findById(getUserId()).get();
        event.setUser(user);
        // Call the repository to save the event in the database
        eventRepo.save(event);
    }

    @Override
    public void update(Long id, EventDtoUpdate dto){
        // Like create method but the event retrieve event by its id
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
    public Page<EventViewDto> getAll(int page, int size) {
        // Retrieve id of the user
        Long userId = getUserId();
        // Create PageRequest object
        Pageable pageable = PageRequest.of(page, size);
        // Create page to contains event list
        Page<EventViewDto> eventList = eventRepo.findAllByUserIdOrderByDateTime(userId, pageable);
        return eventList;
    }

    @Override
    public boolean uniqueEvent(EventDto dto){
        // Call repository to check if event exists
        return dto != null && !eventRepo.existsByTitleAndDateTimeAndUserId(dto.getTitle(), dto.getDateTime(), getUserId());
    }

}
