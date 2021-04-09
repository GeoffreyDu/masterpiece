package fr.formation.masterpieceback.controllers;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventDtoUpdate;
import fr.formation.masterpieceback.dtos.EventViewDto;

import fr.formation.masterpieceback.services.EventService;
import org.springframework.data.domain.Page;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
// The controller is the entry of the API (with /events endpoint) and, after have retrieved data from frontend, call the service
@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // POST : Check users inputs, retrieve them and after call the service
    @PostMapping
    protected void create(@Valid @RequestBody EventDto dto){
        eventService.create(dto);
    }

    // PUT : Retrieve id of the event, check users inputs, retrieve them and after call the service
    @PutMapping("/{id}")
    protected void update(@PathVariable("id") Long id, @Valid @RequestBody EventDtoUpdate dto){
        eventService.update(id, dto);
    }

    // DELETE : Retrieve id of the event and after call the service
    @DeleteMapping("/{id}")
    protected void delete(@PathVariable("id") Long id){eventService.delete(id);}

    // GET : With endpoint /all, we access to this method,
    // the parameters p and s are retrieved from the URL,
    // after the service is called
    @GetMapping("/all")
    protected Page<EventViewDto> getAll(@RequestParam("p") int page,
                                         @RequestParam("s") int size) {
        return eventService.getAll(page, size);
    }
}
