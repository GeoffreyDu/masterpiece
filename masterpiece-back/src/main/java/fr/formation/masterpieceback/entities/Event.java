package fr.formation.masterpieceback.entities;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "events",
        uniqueConstraints =@UniqueConstraint(name ="uq_event", columnNames = {"title", "event_datetime", "user_id"}),
        indexes = {
        @Index(name = "idx_concerns", columnList = "user_id")
})
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 18)
    private String title;

    @Column(name = "event_datetime", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "event_description", nullable = false, length = 30)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_concerns"))
    private User user;

    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
