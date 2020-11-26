package fr.formation.masterpieceback.controllers;

import fr.formation.masterpieceback.dtos.EventDto;
import fr.formation.masterpieceback.dtos.EventDtoUpdate;
import fr.formation.masterpieceback.dtos.EventViewDto;

import fr.formation.masterpieceback.services.EventService;
import org.springframework.data.domain.Page;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    protected void create(@Valid @RequestBody EventDto dto){
        eventService.create(dto);
    }

    @PutMapping("/{id}")
    protected void update(@PathVariable("id") Long id, @Valid @RequestBody EventDtoUpdate dto){
        eventService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    protected void delete(@PathVariable("id") Long id){eventService.delete(id);}

    @GetMapping("/{id}")
    protected EventViewDto getOne(@PathVariable("id") Long id){
        return eventService.get(id);
    }

    @GetMapping("/all")
    protected Page<EventViewDto> getAllEventByUserId(@RequestParam("p") int page,
                                         @RequestParam("s") int size) {
        return eventService.getAllEventByUser(page, size);
    }
}
