package devo.tech.studentpaymentdemo;

import devo.tech.studentpaymentdemo.entities.Payment;
import devo.tech.studentpaymentdemo.entities.PaymentStatus;
import devo.tech.studentpaymentdemo.entities.PaymentType;
import devo.tech.studentpaymentdemo.entities.Student;
import devo.tech.studentpaymentdemo.repository.PaymentRepository;
import devo.tech.studentpaymentdemo.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.rmi.server.UID;
import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class StudentPaymentDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentPaymentDemoApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository){
        return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstname("PDF").code("112233").programId("SDIA")
                    .build());

            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstname("FAYE")
                    .code("112244")
                    .programId("TSHY")
                    .build());

            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstname("DAOUDA")
                    .code("112255")
                    .programId("GLSID")
                    .build());

            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstname("DEV")
                    .code("112266")
                    .programId("BDCC")
                    .build());
            PaymentType[] paymentTypes = PaymentType.values();
            Random random = new Random();
            studentRepository.findAll().forEach(student -> {
                for (int i = 0; i < 10; i++) {
                    int index = random.nextInt(paymentTypes.length);
                    Payment payment = Payment.builder()
                            .amount(1000+(int)(Math.random()*20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(student)
                            .build();
                    paymentRepository.save(payment);


                }
            });
        };
    }
}
